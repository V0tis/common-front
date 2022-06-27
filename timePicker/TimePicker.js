import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import TimePickerItem from './item';
import { useDebounce } from 'helpers/hooks';
import { FrequentlyTypo } from 'components/ui/Typographies';
import moment from 'moment';

const TIMES = {
  hour: new Array(12).fill().map((_, index) => index + 1),
  minute: new Array(60).fill().map((_, index) => index),
};

const List = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1 1;
  overflow: hidden;
  text-align: center;
  height: ${({ height }) => height}px;
`;

const ScrollSelectList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  color: rgb(187, 187, 187);
  position: relative;
  perspective: 1000px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimePicker = ({ onChangeTime, initialTime, containerHeight, itemHeight }) => {
  const [height] = useState({
    container: containerHeight || 157,
    item: itemHeight || 45,
  });
  const refs = useRef([]);
  const debouncer = useDebounce();

  useEffect(() => {
    if (refs.current.length === 2) {
      initialWork();
    }
  }, [refs]);

  const selectedItemSwitchHandler = useCallback((type, id, time) => document.getElementById(`${id}-${time}-scroll-item`)?.classList[type]('selected-time'), []);

  const updatePosition = useCallback((index, top) => refs.current[index].scroll({ top, behavior: 'smooth' }), [refs]);

  const onSelectTime = useCallback(() => {
    const selectedTime = document.getElementsByClassName('selected-time');

    if (selectedTime.length === 2 && onChangeTime) {
      const hour = selectedTime[0]?.id?.split('-')[1];
      const minute = selectedTime[1]?.id?.split('-')[1];
    
      onChangeTime(`${hour}:${minute}`);
    }
  }, []);

  const getItemScrollPosition = useCallback((time) => {
    let y = (time - 1) * height.item;
    return (y === -1 ? 0 : y);
  }, [height.item]);

  const initialWork = () => {
    const splitTime = initialTime?.split(':') || [];

    const times = {
      hour: Number(splitTime[0]) || Number(moment().format('h')),
      minute: Number(splitTime[1]) || Number(moment().format('mm')),
    };

    selectedItemSwitchHandler('add', 'hour', times.hour);
    selectedItemSwitchHandler('add', 'minute', times.minute);

    updatePosition(0, getItemScrollPosition(times.hour));
    updatePosition(1, getItemScrollPosition(times.minute + 1));
  };

  const itemOnClickHandler = (event) => {
    const selectedTime = event.target.id.split('-')[1];
    const id = event.target.id.split('-')[0];
    const refIndex = id === 'hour' ? 0 : 1;

    updatePosition(refIndex, getItemScrollPosition(Number(selectedTime) + (id === 'minute' ? 1 : 0)));
  };

  const handleScroll = async (event) => {
    const scroll = event.target.scrollTop;
    const id = event.target.id.split('_')[1];

    const refIndex = id === 'hour' ? 0 : 1;

    if (await debouncer.asyncDebounce(150)) {
      let itemInSelectorArea = Math.floor((scroll + height.item / 2) / height.item) + (id === 'hour' ? 1 : 0);

      if (itemInSelectorArea <= TIMES[id].length) {
        selectedItemSwitchHandler('add', id, itemInSelectorArea);

        for (let index = 0; index <= TIMES[id].length; index++) {
          if (index !== itemInSelectorArea) {
            selectedItemSwitchHandler('remove', id, index);
          }
        }

        updatePosition(refIndex, getItemScrollPosition(itemInSelectorArea + (id === 'minute' ? 1 : 0)));
        onSelectTime();
      }
    }
  };

  return (
    <List height={height.container}>
      <ScrollSelectList
        id="scroller_hour"
        ref={(ref) => (refs.current[0] = ref)}
        onScroll={handleScroll}
      >
        <div
          style={{
            paddingTop: `${height.container / 2 - height.item / 2}px`,
            paddingBottom: `${height.container / 2 - height.item / 2}px`,
          }}
        >
          {TIMES.hour.map((hour) => (
            <TimePickerItem
              key={`hour-${hour}`}
              text={hour}
              id="hour"
              onClick={itemOnClickHandler}
            />
          ))}
        </div>
      </ScrollSelectList>
      <ScrollSelectList
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: "0px 16px"
        }}
      >
        <FrequentlyTypo font="Montserrat-SemiBold" size={37} color="black" weight="bold">
          :
        </FrequentlyTypo>
      </ScrollSelectList>
      <ScrollSelectList
        id="scroller_minute"
        ref={(ref) => (refs.current[1] = ref)}
        onScroll={handleScroll}
      >
        <div
          style={{
            paddingTop: `${height.container / 2 - height.item / 2}px`,
            paddingBottom: `${height.container / 2 - height.item / 2}px`,
          }}
        >
          {TIMES.minute.map((minute) => (
            <TimePickerItem
              key={`minute-${minute}`}
              text={minute}
              id="minute"
              onClick={itemOnClickHandler}
            />
          ))}
        </div>
      </ScrollSelectList>
    </List>
  );
};

export default TimePicker;
