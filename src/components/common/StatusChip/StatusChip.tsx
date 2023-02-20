import { FC } from "react";
import { Chip, ChipProps } from "@mui/material";
import { StyledAdjustIcon } from "../index";
import { equipmentState } from "../../../consts/state";

interface IProps extends ChipProps {
  state: string;
  selected?: boolean;
  height?: string;
  width?: string;
  handleClick?: (state: string) => void;
  clickable?: boolean;
}

// Component to show state of equiment in a pill shape with state color
export const StatusChip: FC<IProps> = ({
  state,
  selected = false,
  height = "20px",
  width = "120px",
  handleClick,
  clickable = false,
  ...props
}) => {
  const currenState = equipmentState.find(item => item.key === state);
  return (
    <Chip
      sx={{
        background: currenState?.color,
        width: width,
        color: "white",
        fontWeight: 700,
        height: height,
        border: selected ? "2px solid gray" : "none",
        boxShadow: selected ? "0px 0px 16px 3px black" : "none",
      }}
      label={currenState?.value || ''}
      clickable={clickable}
      icon={selected ? <StyledAdjustIcon fontSize="small" /> : undefined}
      onClick={clickable && handleClick ? () => handleClick(state) : undefined}
      {...props}
    />
  );
};
