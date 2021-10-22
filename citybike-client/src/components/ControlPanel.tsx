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
  <div className="ControlPanel__Button" onClick={onClick}>
    <FontAwesomeIcon size="lg" icon={icon} />
  </div>
);

type ControlPanelProps = {
  isPaused?: boolean;
  onFastForward: () => void;
  onFastBackward: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onPlay: () => void;
  onPause: () => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPaused = false,
  onFastBackward,
  onFastForward,
  onStepBackward,
  onStepForward,
  onPlay,
  onPause,
}) => {
  return (
    <div className="ControlPanel">
      <ControlButton icon={faFastBackward} onClick={onFastBackward} />
      <ControlButton icon={faStepBackward} onClick={onFastForward} />
      {!isPaused ? (
        <ControlButton icon={faPause} onClick={onPause} />
      ) : (
        <ControlButton icon={faPlayCircle} onClick={onPlay} />
      )}
      <ControlButton icon={faStepForward} onClick={onStepForward} />
      <ControlButton icon={faFastForward} onClick={onStepBackward} />
    </div>
  );
};

export default ControlPanel;
