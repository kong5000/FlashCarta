import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup({cardsPerSession, setCardsPerSession}) {

  const handleChange = (event) => {
    setCardsPerSession(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Cards Per Session</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={cardsPerSession}
        onChange={handleChange}
      >
        <FormControlLabel value={5} control={<Radio />} label="5" />
        <FormControlLabel value={10} control={<Radio />} label="10" />
        <FormControlLabel value={15} control={<Radio />} label="15" />
      </RadioGroup>
    </FormControl>
  );
}
