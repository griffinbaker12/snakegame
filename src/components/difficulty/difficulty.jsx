import './difficulty.scss';
import { ReactComponent as Caret } from '../../assets/caret.svg';

export const Difficulty = ({
  difficulty,
  handleDifficulty,
  showDifficultyDropdown,
}) => {
  return (
    <div
      className={`difficulty-container 
    ${showDifficultyDropdown ? 'moved' : ''}
    `}
    >
      <div className="difficulty-content-container">
        <p>{difficulty}</p>
        <div
          className={`caret-container ${
            showDifficultyDropdown ? 'bright' : ''
          }`}
          onClick={handleDifficulty}
        >
          <Caret className="caret" />
        </div>
        {showDifficultyDropdown && (
          <ul
            className={`drop-down-items ${
              showDifficultyDropdown ? 'show' : ''
            }`}
            onClick={handleDifficulty}
          >
            {['easy', 'medium', 'hard'].map(difficultyItem => {
              return (
                <li
                  className={`list-item ${
                    difficultyItem === difficulty ? 'active' : ''
                  }`}
                  name={difficultyItem}
                >
                  {difficultyItem}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Difficulty;
