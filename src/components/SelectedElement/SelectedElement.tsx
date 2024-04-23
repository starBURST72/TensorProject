import React from 'react';

interface IElement {
  name: string;
  address: string;
  order: number;
}

interface IElementInfoProps {
  element: IElement;
}

export function ElementInfo({ element }: IElementInfoProps) {
  return (
    <div>
      <p>{element.name}</p>
      <p>{element.address}</p>
      <button>Убрать!</button>
    </div>
  );
}
