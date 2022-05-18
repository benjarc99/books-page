import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const ButtonStyled = styled(Button)`
    background-color: #3f53b5;
    color: #fff;
    margin-left: 8px;

    &:hover {
      background-color: #cad3ff;
      color: #3f53b5;
    }
`

export const BoxModalFormStyled= styled(Box)`
  position: absolute,
  top: 50%,
  left: 50%,
  transform: translate(-50%, -50%),
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
`

