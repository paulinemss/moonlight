import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi'; 

class Greeting extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      username: localStorage.getItem('username') || '',
      editWrapper: ''
    }

    this.wrapperRef = React.createRef();
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
    if (this.state.value !== '') {
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
    let date = now.getDate();
    const hour = now.getHours();
    let hello; 

    if (date === 1 || date === 21 || date === 31) {
      date += 'st';
    } else if (date === 2 || date === 22) {
      date += 'nd';
    } else if (date === 3 || date === 23) {
      date += 'rd';
    } else {
      date += 'th'; 
    }

    if (hour > 4 && hour < 12) {
      hello = 'Good morning';
    } else if (hour > 12 && hour < 18) {
      hello = 'Good afternoon';
    } else if (hour > 18 || hour < 4) {
      hello = 'Good evening'; 
    }

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
                  className='greeting__input' 
                  value={this.state.value} 
                  onChange={this.handleChange}
                  onBlur={this.handleSubmit}
                />
              </form>
          }
        </h1>
        <h2 className='greeting__date'>{day} {date} {month}</h2>
      </div> 
    )
  }
}

export default Greeting; 