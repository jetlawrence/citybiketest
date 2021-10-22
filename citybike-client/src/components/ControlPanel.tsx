import {
  faFastBackward,
  faStepBackward,
  faPause,
  faPlayCircle,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

type ControlButtonProps = {
  icon: FontAwesomeIconProps["icon"];
  onClick: () => void;
};

const ControlButton: React.FC<ControlButtonProps> = ({ icon, onClick }) => (
  <button className="ControlPanel__Button" onClick={onClick}>
    <FontAwesomeIcon size="lg" icon={icon} />
  </button>
);

type ControlPanelProps = {
  isPaused?: boolean;
  onFastForward?: () => void;
  onFastBackward?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  isOnFirst?: boolean;
  isOnLast?: boolean;
};

const noop = () => {};

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPaused = false,
  onFastBackward = noop,
  onFastForward = noop,
  onStepBackward = noop,
  onStepForward = noop,
  onPlay = noop,
  onPause = noop,
  isOnFirst,
  isOnLast,
}) => {
  return (
    <div className="ControlPanel">
      <ControlButton icon={faFastBackward} onClick={onFastBackward} />
      <ControlButton icon={faStepBackward} onClick={onStepBackward} />
      {!isPaused ? (
        <ControlButton icon={faPause} onClick={onPause} />
      ) : (
        <ControlButton icon={faPlayCircle} onClick={onPlay} />
      )}
      <ControlButton icon={faStepForward} onClick={onStepForward} />
      <ControlButton icon={faFastForward} onClick={onFastForward} />
    </div>
  );
};

export default ControlPanel;
