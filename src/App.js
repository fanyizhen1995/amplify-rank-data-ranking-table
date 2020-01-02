import React from 'react';

// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'

// import query definition
import { listRanks as ListRanks } from './graphql/queries'
import { onCreateRank, onUpdateRank, onDeleteRank } from './graphql/subscriptions'


import awsmobile from './aws-exports'
import RankTable from './RankTable';
import Header from './Header';

API.configure(awsmobile)

class App extends React.Component {
  // define some state to hold the data returned from the API
  state = {
    ranks: []
  }

  // execute the query in componentDidMount
  updateRank(newRank) {
    const ranks = this.state.ranks.map(rank => rank.id === newRank.id
      ? newRank : rank
    );
    this.setState({
      ranks,
    })
  }

  deleteRank(newRank){
    this.setState({ranks: this.state.ranks.filter(rank => rank.id !== newRank.id)});
  }

  async componentDidMount() {

    try {
      const rankData = await API.graphql(graphqlOperation(ListRanks))
      console.log('talkData:', rankData)
      this.setState({
        ranks: rankData.data.listRanks.items
      })
    } catch (err) {
      console.log('error fetching ranks...', err)
    }

    this.createRankSubscription = API.graphql(
      graphqlOperation(onCreateRank)
    ).subscribe({
      next: (rankData) => {this.setState({ranks: [...this.state.ranks, rankData.value.data.onCreateRank]})}
    })
    this.updateRankSubscription = API.graphql(
      graphqlOperation(onUpdateRank)
    ).subscribe({
      next: (rankData) => {this.updateRank(rankData.value.data.onUpdateRank)}
    })
    this.deleteRankSubscription = API.graphql(
      graphqlOperation(onDeleteRank)
    ).subscribe({
      next: (rankData) => {this.deleteRank(rankData.value.data.onDeleteRank)}
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <RankTable ranks={this.state.ranks.sort((a,b) => a.score < b.score).slice(0,3)}/>
      </React.Fragment>
    )
  }
}

export default App