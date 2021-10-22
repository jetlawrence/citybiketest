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
  disabled?: boolean;
};

const ControlButton: React.FC<ControlButtonProps> = ({
  icon,
  onClick,
  disabled,
}) => (
  <button
    className="ControlPanel__Button"
    onClick={onClick}
    disabled={disabled}
  >
    <FontAwesomeIcon
      size="lg"
      icon={icon}
      color={disabled ? "gray" : "black"}
    />
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
  canRewind?: boolean;
  canForward?: boolean;
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
  canRewind,
  canForward,
}) => {
  return (
    <div className="ControlPanel">
      <ControlButton
        icon={faFastBackward}
        onClick={onFastBackward}
        disabled={!canRewind}
      />
      <ControlButton
        icon={faStepBackward}
        onClick={onStepBackward}
        disabled={!canRewind}
      />
      {!isPaused ? (
        <ControlButton icon={faPause} onClick={onPause} />
      ) : (
        <ControlButton icon={faPlayCircle} onClick={onPlay} />
      )}
      <ControlButton
        icon={faStepForward}
        onClick={onStepForward}
        disabled={!canForward}
      />
      <ControlButton
        icon={faFastForward}
        onClick={onFastForward}
        disabled={!canForward}
      />
    </div>
  );
};

export default ControlPanel;
