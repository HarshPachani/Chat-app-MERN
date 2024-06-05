import { Link as LinkComponent } from 'react-router-dom';
import { styled } from '@mui/material';

const Link = styled(LinkComponent)
    `text-decoration: none;
    color: black;
    padding: 1rem;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    `;

export { Link };