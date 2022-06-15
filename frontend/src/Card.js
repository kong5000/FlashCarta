import * as React from 'react';
import {useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.longest,
  }),
}));


export default function WordCard({setCardOpen, cardOpen, deck, activeCardIndex}) {
  const handleExpandClick = () => {
    if(!cardOpen) setCardOpen(!cardOpen)

  };
  useEffect(() => {
    setCardOpen(false)
  },[activeCardIndex])
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title=     {deck && deck[activeCardIndex].word}
      />

      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={cardOpen}
          onClick={handleExpandClick}
          aria-expanded={cardOpen}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={cardOpen} timeout={{enter:"100", exit:"0"}} unmountOnExit >
        <CardContent>
          <Typography paragraph> {deck && deck[activeCardIndex].definition}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
