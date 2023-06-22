import React from 'react'
import { FlatList } from 'react-native'
import { Marker, MarkerPressEvent } from 'react-native-maps';
import carIcon from '../../assets/car.png'
import busIcon from '../../assets/bus.png'
import truckIcon from '../../assets/truck.png'



export type autoType = {
    id: number
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
    onAutoClick(auto: autoType): void,

}

const RenderAutos:React.FC<Props> = ({autos, onAutoClick}) => {

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
        onAutoClick(item)
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

export default RenderAutos