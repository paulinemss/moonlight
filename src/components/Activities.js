import React from 'react';
import { FiSquare, FiCheckSquare, FiPlusSquare, FiArrowRight } from 'react-icons/fi';

let usedTodos = [];

class Activities extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      threeTodos: [],
      completedTodos: [],
      inputHidden: 'inputtodo__hidden',
      inputValue: '',
      userInput: [],
      mergedTodos: []
    }

    this.getThreeTodos = this.getThreeTodos.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.toggleTodosInput = this.toggleTodosInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  toggleTodosInput () {
    if (this.state.inputHidden === 'inputtodo__hidden') {
      this.setState({ inputHidden: '' });
    } else {
      this.setState({ inputHidden: 'inputtodo__hidden' });
    }
  }

  handleChange (event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit (event) {
    const { now } = this.props;
    const today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    const newUserInput = this.state.userInput.slice(); 
    newUserInput.push(this.state.inputValue);

    this.setState({ userInput: newUserInput });
    localStorage.setItem(`userInput-${today}`, JSON.stringify(newUserInput));
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
    const savedDailyTodos = JSON.parse(
      localStorage.getItem(`threeToDos-${today}`)
    );
    const savedUserInput = JSON.parse(
      localStorage.getItem(`userInput-${today}`)
    );

    if (savedDailyTodos && savedUserInput) {
      const mergedTodos = savedDailyTodos.concat(savedUserInput);
      this.setState({ threeTodos: savedDailyTodos });
      this.setState({ userInput: savedUserInput });
      this.setState({ mergedTodos: mergedTodos });
    } else {
      const threeTodos = this.getThreeTodos(todos, moonPhase); 
      this.setState({ threeTodos: threeTodos })
      localStorage.setItem(`threeToDos-${today}`, JSON.stringify(threeTodos));
      if (savedUserInput) {
        const mergedTodos = threeTodos.concat(savedUserInput);
        this.setState({ userInput: savedUserInput });
        this.setState({ mergedTodos: mergedTodos });
      }
    }

    // checking if there are already completed daily todos
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedCompletedTodos) {
      this.setState({ completedTodos: savedCompletedTodos })
    }

  }

  render () {

    let selfCarePrompts = []; 

    if (this.state.mergedTodos.length > 0) {
      selfCarePrompts = this.state.mergedTodos.slice(); 
    } else {
      selfCarePrompts = this.state.threeTodos.slice(); 
    }

    return (
      <div>

        <h2>Self-care prompts</h2>

        <ul className='activity__all'>

          {selfCarePrompts.map((todo, index) => (
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
          
          <li className={this.state.inputHidden}>
            <p className='activity__line'>
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
                  value={this.state.inputValue} 
                  onChange={this.handleChange}
                />
              </form>
            </p>
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