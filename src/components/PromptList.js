import React from 'react';
import { FiSquare, FiCheckSquare, FiX } from 'react-icons/fi';

function PromptList (props) {
  const { 
    arrayTodos, 
    completedTodos, 
    toggleCheckbox, 
    showRemoveButton,
    removeUserInput,
    now 
  } = props

  return (
    arrayTodos.map((todo, index) => (
      completedTodos.includes(todo)
        ? <li className='activity__main' key={index}>
            <div className='activity__line'>
              <div className='checkbox__wrapper'>
                <button 
                  className='checkbox__btn checked'
                  onClick={() => toggleCheckbox(todo, now)}
                >
                    <FiCheckSquare />
                </button>
              </div>
              <span>{todo}</span>
            </div>
            {showRemoveButton && 
              <button
                className='userinput__btn'
                onClick={() => removeUserInput(todo, now)}
              >
                  <FiX />
              </button>
            }
          </li>
        : <li className='activity__main' key={index}>
            <div className='activity__line'>
              <div className='checkbox__wrapper'>
                <button 
                  className='checkbox__btn'
                  onClick={() => toggleCheckbox(todo, now)}
                >
                    <FiSquare />
                </button>
              </div>
              <span>{todo}</span>
            </div>
            {showRemoveButton && 
              <button
                className='userinput__btn'
                onClick={() => removeUserInput(todo, now)}
              >
                  <FiX />
              </button>
            }
          </li>
    ))
  )
}

export default PromptList; 

