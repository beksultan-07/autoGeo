import React from 'react'
import { FlatList } from 'react-native'
import { Marker, MarkerPressEvent } from 'react-native-maps';
import carIcon from '../../assets/car.png'
import busIcon from '../../assets/bus.png'
import truckIcon from '../../assets/truck.png'



export type autoType = {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    category: string;
    owner: string;
    contacts: string;
}


type Props = {
    autos: Array<autoType>,
    autoClick(auto: autoType): void,

}

const AutosList:React.FC<Props> = ({autos, autoClick}) => {

    const checkAuto = (category: string) => {
        switch (category){
            case 'B':
                return carIcon
            case 'D': 
                return truckIcon
            default:
                return busIcon
        }
    }

    const autoClickHandler = (e: MarkerPressEvent, item: autoType) => {
        e.stopPropagation()
        autoClick(item)
    }


  return (
    <>
        {
            autos.map(item => (
                <Marker
                    onPress={(e) => autoClickHandler(e, item)}
                    coordinate={item.coordinate}
                    image={checkAuto(item.category)}
                />
            ))
        }
    </>
  )
}

export default AutosList