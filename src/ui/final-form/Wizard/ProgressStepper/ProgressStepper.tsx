type Status = 'complete' | 'incomplete' | 'current';

export interface ProgressStep {
  step: number;
  title: string;
}

interface Props {
  steps: ProgressStep[];
  currentStep: number;
  onClick: (step: ProgressStep) => void;
}

export default function ProgressStepper(props: Props) {
  const { currentStep, steps, onClick } = props;

  return (
    <div className="ProgressStepper">
      <ul>
        {steps.map(progress => (
          <Item
            key={progress.step}
            onClick={onClick}
            progress={progress}
            currentStepIndex={currentStep}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
}

function Item(props: {
  progress: ProgressStep;
  currentStepIndex: number;
  onClick: (step: ProgressStep) => void;
}) {
  const { progress, currentStepIndex, onClick } = props;

  const status = getStatus(progress.step, currentStepIndex);

  return (
    <li className={`step ${status}`}>
      <div
        className="progress-circle"
        onClick={() => status === 'complete' && onClick(progress)}
      >
        <span>{progress.step + 1}</span>
      </div>
      <div
        className="progress-label"
        onClick={() => status === 'complete' && onClick(progress)}
      >
        {progress.title}
      </div>
    </li>
  );
}

function getStatus(stepIndex: number, currentStepIndex: number): Status {
  if (stepIndex === currentStepIndex) {
    return 'current';
  } else {
    return stepIndex < currentStepIndex ? 'complete' : 'incomplete';
  }
}
