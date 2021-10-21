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
};

const ControlButton: React.FC<ControlButtonProps> = ({ icon }) => (
  <div className="ControlPanel__Button">
    <FontAwesomeIcon size="lg" icon={icon} />
  </div>
);

type ControlPanelProps = {
  isPaused?: boolean;
};

const ControlPanel: React.FC<ControlPanelProps> = ({ isPaused = false }) => {
  return (
    <div className="ControlPanel">
      <ControlButton icon={faFastBackward} />
      <ControlButton icon={faStepBackward} />
      {!isPaused ? (
        <ControlButton icon={faPause} />
      ) : (
        <ControlButton icon={faPlayCircle} />
      )}
      <ControlButton icon={faStepForward} />
      <ControlButton icon={faFastForward} />
    </div>
  );
};

export default ControlPanel;
