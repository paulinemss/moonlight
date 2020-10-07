import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi'; 
import { getFriendlyDate, getGreeting } from '../helpers';

class Greeting extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      username: localStorage.getItem('username') || '',
      editWrapper: ''
    }

    this.wrapperRef = React.createRef();
    this.usernameInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEditWrapper = this.toggleEditWrapper.bind(this);
    this.editUsername = this.editUsername.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this); 
  }
  
  handleChange (event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.value.trim() !== '') {
      this.setState({ username: this.state.value })
      localStorage.setItem('username', this.state.value)
      event.preventDefault();
    }
  }

  toggleEditWrapper () {
    if (this.state.editWrapper === '') {
      this.setState({ editWrapper: 'edit__open' })
    } else {
      this.setState({ editWrapper: '' })
    }
  }

  editUsername () {
    this.setState({ 
      value: this.state.username,
      username: '',
      editWrapper: ''
    });
    localStorage.removeItem('username');
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.state.editWrapper === 'edit__open') {
        this.setState({ editWrapper: '' });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render () {
    const { now } = this.props

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const month = months[now.getMonth()];
    const day = days[now.getDay()];
    const date = now.getDate();
    const hour = now.getHours(); 

    const friendlyDate = getFriendlyDate(date);
    const hello = getGreeting(hour); 

    return (
      <div className='greeting__wrapper'>
        <h1 className='greeting__title' ref={this.wrapperRef}>
          <span>{hello},</span>
          {this.state.username !== ''
            ? <>
                <span className='greeting__username'> 
                  {this.state.username}
                </span>.
                <button
                  onClick={this.toggleEditWrapper}
                  className={`toggle__button ${this.state.editWrapper}`}
                >
                  <HiOutlineDotsHorizontal />
                </button>
                <div 
                  className={`edit__wrapper ${this.state.editWrapper}`}
                >
                  <button
                    onClick={this.editUsername}
                    className='edit__button'
                  >
                    Edit your name
                  </button>
                </div>
              </>
            : <form onSubmit={this.handleSubmit}>
                <input 
                  type='text' 
                  name='username'
                  ref={usernameInput => usernameInput && usernameInput.focus()}
                  className='greeting__input' 
                  value={this.state.value} 
                  onChange={this.handleChange}
                  onBlur={this.handleSubmit}
                />
              </form>
          }
        </h1>
        <h2 className='greeting__date'>{day} {friendlyDate} {month}</h2>
      </div> 
    )
  }
}

export default Greeting; 