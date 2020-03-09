import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import Functions from "../../utils/Functions";

const Wrapper = styled.div`
  border: 3px solid ${({color}) => color ? color : '#2e3131'};
  width: 340px;
  height: 550px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  margin: auto;
  position: relative;
  z-index: 9000;
  @media screen and (max-width: 600px) {
    width: 300px;
  }
`;

const Image = styled.img`
  display: block;
  height: 310px;
  width: 100%;
  object-fit: cover;
  margin: auto; 
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  @media screen and (max-width: 600px) {
    height: 270px;
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;  
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  color: ${({text}) => text ? '#db0a5b' : 'auto'};
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  background-color: white;
`;

const Rarity = styled.div`
  width: 100%;
  text-align: center;
  font-size: 10px;
  text-transform: uppercase; 
  position: absolute;
  bottom: 5px;
  left: 0;
`;

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2px;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
  text-align: center;
`;

const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 35px;
  width: 35px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute; 
  top: 5px;
  left: 5px;
  line-height: 15px;
`;

export default class Dzerdan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    }
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.item, prevProps.item)) {
      this.update();
    }
  } 

  update() {
    this.setState({
      item: this.props.item
    })
  }

  render () {
    const {
      item: {
        nameStr,
        alignment,
        image,
        traits,
        rarity,
        kawaii
      } 
    } = this.state;
    const {
      imagePath,
      getColor,
      getBgColor,
      parseRarity
    } = Functions;

    let color = getColor(rarity);
    let bgColor = getBgColor(rarity);

    let rarityMod = alignment > 0 ? 'Порядочный' : alignment < 0 ? 'Хитровыебанный' : '';

    return (
      <Wrapper color={color} bgColor={bgColor}> 
        <Image src={imagePath(image)} color={color} />
        <Name color={color} text={kawaii}>
          { nameStr || ''}{kawaii && '-тян'}
        </Name>
        { traits && traits.map(item =>(
          <Text key={`${item.which.word} ${item.what.word} ${item.who.word}`}>
            {
              `${item.which.word} ${item.what.word} ${item.who.word}`
            }
          </Text>
        ))}
        
        <Rarity>
          {`${rarityMod} ${parseRarity(rarity)} ${kawaii ? 'ня-' : ''}дзердан`}
        </Rarity>
        {
          alignment > 0 ? (
            <Stat color={'#26a65b'} bgColor={'#2ecc71'} title={`Порядочный: +${alignment}`}>
              {`+${alignment}`}
            </Stat>
          ) : alignment < 0 ? (
            <Stat color={'#cf000f'} bgColor={'#e74c3c'} title={`Хитровыебанный: ${alignment}`}>
              {alignment}
            </Stat>
          ) : (
            <Stat color={'#2e3131'} bgColor={'#ececec'} title={`Нейтральный: ${alignment}`}>
              {alignment}
            </Stat>
          )
        }
      </Wrapper>
    )
  }
}