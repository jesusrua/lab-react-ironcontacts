import React from 'react';
import './App.sass';
import contacts from './contacts.json'

class App extends React.Component {

  state={
    contactsList: contacts.slice(0, 5)
  }

  addRandomContact = () => {
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)]
    const copyList = [...this.state.contactsList]

    if (contacts.length === copyList.length) {
        return alert("No more contacts")
    } else if (copyList.includes(randomContact)) {
      return this.addRandomContact()
    } else {
      copyList.unshift(randomContact)
    }

    this.setState({contactsList: copyList})
  }

  sortByName = () => {
    const copyList = [...this.state.contactsList]
    const sortedByNameCopyList = copyList.sort((a, b) => {
      if(a.name > b.name) {
        return 1
      } else if (a.name < b.name) {
        return -1
      }
      return 0
    })
    this.setState({contactsList: sortedByNameCopyList})
  }

  sortByPopularity = ()=> {
    const copyList = [...this.state.contactsList]
    const sortedByPopularityCopyList = copyList.sort((a, b)=>{
      return b.popularity - a.popularity
    })

    this.setState({contactsList: sortedByPopularityCopyList})
  }

  deleteContact = (index)=>{
    const copyList = [...this.state.contactsList]
    copyList.splice(index, 1)
    this.setState({contactsList: copyList})
  }

  render() {
      return (
        <div className="App">
          <h1>IronContacts</h1>

          <button onClick={this.addRandomContact}>Add Random Contact</button>
          <button onClick={this.sortByName}>Sort by name</button>
          <button onClick={this.sortByPopularity}>Sort by popularity</button>

          <table>
          <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contactsList.map((contact, index)=>(
              <tr key={index}>
                <td><img src={contact.pictureUrl} alt={contact.name}></img></td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td><button className="button" onClick={()=>this.deleteContact(index)}>Delete</button></td>
              </tr>   
              ))}
            </tbody>
          </table>
        </div>
      );
  }

}

export default App;
