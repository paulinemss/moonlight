import React from 'react';
import { FiSquare, FiCheckSquare, FiPlusSquare } from 'react-icons/fi';

let usedTodos = [];

class Activities extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      threeTodos: [],
      completedTodos: []
    }

    this.getThreeTodos = this.getThreeTodos.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  getThreeTodos (allTodos, moonPhase) {
    let newTodos = allTodos.filter(todo => !usedTodos.includes(todo));
    const threeTodos = []; 
    
    if (newTodos.length < 3) {
      newTodos = allTodos.slice(); 
      usedTodos = []; 
    } 

    for (let i=0; i<3; i++) {
      let index = Math.floor(Math.random() * newTodos.length);
      threeTodos.push(newTodos[index]);
      usedTodos.push(newTodos[index]); 
      newTodos.splice(index, 1); 
    }

    localStorage.setItem(moonPhase, JSON.stringify(usedTodos));

    return threeTodos; 
  }

  toggleCheckbox (todo) {
    const completedTodos = this.state.completedTodos.slice(); 

    if (completedTodos.includes(todo)) {
      let index = completedTodos.indexOf(todo); 
      completedTodos.splice(index, 1); 
    } else {
      completedTodos.push(todo); 
    }

    this.setState({ completedTodos: completedTodos });
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }

  componentDidMount () {
    const { todos, moonPhase, now } = this.props;
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    // checking if there are any used todos already in local storage 
    const savedUsedTodos = JSON.parse(localStorage.getItem(moonPhase));
    if (savedUsedTodos) {
      usedTodos = savedUsedTodos; 
    }

    // checking if three todos have already been rendered and saved to local storage today 
    const savedDailyTodos = JSON.parse(localStorage.getItem(today));
    if (savedDailyTodos) {
      this.setState({ threeTodos: savedDailyTodos })
    } else {
      const threeTodos = this.getThreeTodos(todos, moonPhase); 
      this.setState({ threeTodos: threeTodos })
      localStorage.setItem(today, JSON.stringify(threeTodos));
    }

    // checking if there are already completed daily todos
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedCompletedTodos) {
      this.setState({ completedTodos: savedCompletedTodos })
    }

  }

  render () {
    return (
      <div>
        <h2>Self-care prompts</h2>
        <ul className='activity__all'>
          {this.state.threeTodos.map((todo, index) => (
            this.state.completedTodos.includes(todo)
              ? <li key={index}>
                  <p className='activity__line'>
                    <div className='checkbox__wrapper'>
                      <button 
                        className='checkbox__btn checked'
                        onClick={() => this.toggleCheckbox(todo)}
                      >
                          <FiCheckSquare />
                      </button>
                    </div>
                    <span>{todo}</span>
                  </p>
                </li>
              : <li key={index}>
                  <p className='activity__line'>
                    <div className='checkbox__wrapper'>
                      <button 
                        className='checkbox__btn'
                        onClick={() => this.toggleCheckbox(todo)}
                      >
                          <FiSquare />
                      </button>
                    </div>
                    <span>{todo}</span>
                  </p>
                </li>
          ))}
        </ul>
        <div className='addtodo__wrapper'>
          <button 
            className='addtodo__btn'
          >
              <span className='addtodo__icon'><FiPlusSquare /></span>
              <span>New Todo</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Activities; 