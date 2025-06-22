import React, { useState, useEffect } from 'react';

import { format } from 'date-fns'

export default function TimeSlotPicker({ slots, onSelect }) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatTime = async (utcDate) => {
    const { utcToZonedTime } = await import('date-fns-tz');
    const zonedDate = utcToZonedTime(utcDate, userTimeZone);
    return format(zonedDate, 'MMM dd, yyyy h:mm a');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {slots.map(slot => (
        <AsyncSlot 
          key={slot.id} 
          slot={slot}
          formatTime={formatTime}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function AsyncSlot({ slot, formatTime, onSelect }) {
  const [timeText, setTimeText] = React.useState('Loading...');

  React.useEffect(() => {
    (async () => {
      const startStr = await formatTime(slot.start);
      const endStr = await formatTime(slot.end);
      setTimeText(`${startStr} - ${endStr}`);
    })();
  }, [slot]);

  return (
    <div 
      className={`border rounded-lg p-4 ${
        slot.remaining_slots > 0 
          ? 'hover:bg-blue-50 cursor-pointer border-blue-200' 
          : 'bg-gray-100 opacity-75 border-gray-300'
      }`}
      onClick={() => slot.remaining_slots > 0 && onSelect(slot.id)}
    >
      <div className="font-medium">
        {timeText}
      </div>
      <div className={`text-sm ${
        slot.remaining_slots > 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {slot.remaining_slots > 0 
          ? `${slot.remaining_slots} slot(s) available` 
          : 'Fully booked'}
      </div>
    </div>
  );
}
