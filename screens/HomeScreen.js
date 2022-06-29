import React from 'react';
import { StyleSheet, ScrollView, Image, View, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions'
import NavFavourites from '../components/NavFavourites'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlices';

const HomeScreen = ({
    params,
}) => {
const dispatch = useDispatch();

return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image
                style={{
                    width: 100, height: 100, resizeMode: 'contain'
                }}
                source={{
                    uri: 'https://links.papareact.com/gzs'
                }}
            />
            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}
                onPress={(data, details = null) =>{
                    dispatch(setOrigin({
                        location:details.geometry.location,
                        description: data.description
                    }))
                    dispatch(setDestination(null))
                }}
                returnKeyType={"search"}
                fetchDetails= {true}
                onFail={error => console.error(error)}
                minLength={2}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                placeholder="Where from?"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                enablePoweredByContainer={false}
            />
            <NavOptions />
            <NavFavourites />
        </View>
    </SafeAreaView>
);
}

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: "blue"
    }
})
