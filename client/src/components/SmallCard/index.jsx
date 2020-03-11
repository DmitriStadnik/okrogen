import React from 'react';
import styled from 'styled-components';
import Functions from "../../utils/Functions";

const Card = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex: ${({left}) => left ? '0' : '1'};
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  object-fit: cover;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  border-radius: 3px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const Name = styled.div`
  background-color: white;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  color: ${({text}) => text ? '#db0a5b' : 'auto'};
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 12px;
  @media screen and (max-width: 500px) {
    margin-bottom: 7px;
  }
`;

const Traits = styled.div`
  height: 140px;
  width: 100%;
`;

const Trait = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2px;
  padding: 5px 2px;
  border-radius: 5px;
  font-size: 11px;
  text-align: center;
`;

const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 25px;
  width: 25px;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
`;

const DataItem = styled.div`
  width: 100%;
  font-size: 10px;
`;

const Rarity = styled.div`
  width: 100%;
  font-size: 10px;
  padding: 5px;
  text-transform: uppercase;
  text-align: center;
`;

const Price = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 5px 10px;
  bottom: 10px;
  right: 10px;
`;

export default ({item}) => (
  <Card color={Functions.getColor(item.rarity)} bgColor={Functions.getBgColor(item.rarity)} key={item.name.join('')}>
    <Column left>
      <Image src={Functions.imagePath(item.image)} color={Functions.getColor(item.rarity)} />
      {
        item.alignment > 0 ? (
          <Stat color={'#26a65b'} bgColor={'#2ecc71'} title={`Порядочный: +${item.alignment}`}>
            {`+${item.alignment}`}
          </Stat>
        ) : item.alignment < 0 ? (
          <Stat color={'#cf000f'} bgColor={'#e74c3c'} title={`Хитровыебанный: ${item.alignment}`}>
            {item.alignment}
          </Stat>
        ) : (
          <Stat color={'#2e3131'} bgColor={'#ececec'} title={`Нейтральный: ${item.alignment}`}>
            {item.alignment}
          </Stat>
        )
      }
    </Column>
    <Column>
      <Name color={Functions.getColor(item.rarity)} text={item.kawaii}>
        {item.nameStr}{item.kawaii && '-тян'}
      </Name>
      <Rarity>
        {`${item.alignment > 0 ? 'Порядочный' : item.alignment < 0 ? 'Хитровыебанный' : ''} ${Functions.parseRarity(item.rarity)} ${item.kawaii ? 'ня-' : ''}дзердан`}
      </Rarity>
    </Column>
    <Traits>
      { item.traits && item.traits.map(trait =>(
        <Trait key={`${trait.which.word} ${trait.what.word} ${trait.who.word}`}>
        {
          `${trait.which.word} ${trait.what.word} ${trait.who.word}`
        }
        </Trait>
      ))}
    </Traits>
    <DataItem>
      Дата создания: { Functions.parseDate(item.dateCreated) }
    </DataItem>
    <DataItem>
      Создатель: {item.createdBy && item.createdBy.length > 0 ? item.createdBy[0].name : 'Генератор'}
    </DataItem>
    <DataItem>
      Владелец: {item.createdBy && item.owner.length > 0 ? item.owner[0].name : 'Генератор'}
    </DataItem>
    <Price color={'#cf000f'} bgColor={'#e74c3c'}>
      {item.price}
    </Price>
  </Card>
);