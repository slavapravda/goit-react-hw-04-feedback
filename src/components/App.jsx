import { useState } from 'react';

import Statistics from './Feedback/Statistics/Statistics';
import FeedbackOptions from './Feedback/FeedbackOptions/FeedbackOptions';
import Section from './Feedback/Section/Section';
import Notification from './Feedback/Notification/Notification';

 const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = state;
  const total = good + neutral + bad;

  const onLeaveFeedback = propertyName => {
    setState(prevState => {
      return {
        ...prevState,
        [propertyName]: prevState[propertyName] + 1,
      };
    });
  };

  const countPositiveFeedbackPercentage = () => {
    if (!total) {
      return 0;
    }
    const result = (good / total) * 100;
    return Math.round(result);
  };

  const options = Object.keys(state);

  return (
    <div className="feedback">
      <Section title="Please leave Feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;