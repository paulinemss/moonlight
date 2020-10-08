import React from 'react';
import ReactDOM from 'react-dom';
import PromptList from './PromptList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { FiPlusSquare, FiArrowRight } from 'react-icons/fi';

let usedTodos = [];

class Activities extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      threeTodos: [],
      completedTodos: [],
      inputHidden: 'inputtodo__hidden',
      inputValue: '',
      userInput: []
    }

    this.userInputField = React.createRef();
    this.promptListDiv = React.createRef(); 
    this.getThreeTodos = this.getThreeTodos.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.toggleTodosInput = this.toggleTodosInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeUserInput = this.removeUserInput.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
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

  toggleCheckbox (todo, now) {
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    const completedTodos = this.state.completedTodos.slice(); 

    if (completedTodos.includes(todo)) {
      let index = completedTodos.indexOf(todo); 
      completedTodos.splice(index, 1); 
    } else {
      completedTodos.push(todo); 
    }

    this.setState({ completedTodos: completedTodos });
    localStorage.setItem(`completedTodos-${today}`, JSON.stringify(completedTodos));
  }

  toggleTodosInput () {
    const { now } = this.props;
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    if (this.state.inputHidden === 'inputtodo__hidden') {
      this.setState({ inputHidden: '' });
    } else {
      if (this.state.inputValue.trim() !== '') {
        const newUserInput = this.state.userInput.slice(); 
        newUserInput.push(this.state.inputValue);
        this.setState({ 
          userInput: newUserInput,
          inputValue: ''
        });
        localStorage.setItem(`userInput-${today}`, JSON.stringify(newUserInput));
        this.scrollToBottom(); 
      } else {
        this.setState({ inputHidden: 'inputtodo__hidden' });
      }
    }
  }

  handleChange (event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    const { now } = this.props;
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    if (this.state.inputValue.trim() !== '') {
      const newUserInput = this.state.userInput.slice(); 
      newUserInput.push(this.state.inputValue);

      this.setState({ 
        userInput: newUserInput,
        inputValue: ''
      });
      localStorage.setItem(`userInput-${today}`, JSON.stringify(newUserInput));
      this.scrollToBottom(); 
    }
  }

  removeUserInput (todo, now) {
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    const newUserInput = this.state.userInput.slice(); 
    const indexOfRemovedTodo = newUserInput.indexOf(todo); 
    newUserInput.splice(indexOfRemovedTodo, 1); 

    this.setState({ userInput: newUserInput });
    localStorage.setItem(`userInput-${today}`, JSON.stringify(newUserInput));
  }

  scrollToBottom () {
    const promptListDiv = ReactDOM.findDOMNode(this.promptListDiv);
    promptListDiv.scrollTop = promptListDiv.scrollHeight - promptListDiv.clientHeight; 
  }

  componentDidMount () {
    const { todos, moonPhase, now } = this.props;
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    // checking if there are any used todos already in local storage 
    const savedUsedTodos = JSON.parse(localStorage.getItem(moonPhase));
    if (savedUsedTodos) {
      usedTodos = savedUsedTodos; 
    }

    // checking if three todos and/or user input have already been rendered and saved to local storage today 
    const savedDailyTodos = JSON.parse(
      localStorage.getItem(`threeTodos-${today}`)
    );
    const savedUserInput = JSON.parse(
      localStorage.getItem(`userInput-${today}`)
    );

    if (savedDailyTodos) {
      this.setState({ threeTodos: savedDailyTodos });
    } else {
      const threeTodos = this.getThreeTodos(todos, moonPhase); 
      this.setState({ threeTodos: threeTodos })
      localStorage.setItem(`threeTodos-${today}`, JSON.stringify(threeTodos));
    }

    if (savedUserInput) {
      this.setState({ userInput: savedUserInput });
    }

    // checking if there are already completed daily todos
    const savedCompletedTodos = JSON.parse(
      localStorage.getItem(`completedTodos-${today}`)
    );
    if (savedCompletedTodos) {
      this.setState({ completedTodos: savedCompletedTodos })
    }

    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  render () {
    const { now } = this.props;
    return (
      <div>
        <h2>Self-care prompts</h2>
        
        <ul>

          <div className='activity__all'>
            <PerfectScrollbar ref={(el) => { this.promptListDiv = el; }}>
              <PromptList 
                arrayTodos={this.state.threeTodos}
                completedTodos={this.state.completedTodos}
                toggleCheckbox={this.toggleCheckbox}
                showRemoveButton={false}
                removeUserInput={this.removeUserInput}
                now={now}
              />

              {this.state.userInput.length > 0 && 
                <PromptList 
                  arrayTodos={this.state.userInput}
                  completedTodos={this.state.completedTodos}
                  toggleCheckbox={this.toggleCheckbox}
                  showRemoveButton={true}
                  removeUserInput={this.removeUserInput}
                  now={now}
                />
              }
            </PerfectScrollbar>
          </div>
          
          <li className={this.state.inputHidden}>
            <div className='activity__line'>
              <div className='checkbox__wrapper'>
                <button 
                  className='arrow__icon'
                >
                    <FiArrowRight />
                </button>
              </div>
              <form className='inputtodo__form' onSubmit={this.handleSubmit}>
                <input 
                  type='text' 
                  className='inputtodo__field' 
                  ref={userInputField => userInputField && userInputField.focus()}
                  value={this.state.inputValue} 
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </li>

        </ul>
      

        <div className='addtodo__wrapper'>
          <button 
            className='addtodo__btn'
            onClick={this.toggleTodosInput}
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