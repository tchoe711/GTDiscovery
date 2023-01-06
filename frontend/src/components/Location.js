import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import "../pages/Map.css"
  import * as React from 'react';

export default function Search({ setLoc, input }) {
    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          location: { lat: () => 33.775614, lng: () => -84.397312 },
          radius: 1 * 1000,
        },
      });
    React.useState(() => {
      setValue(input)
    }, [])
    console.log(value)

      const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setLoc(address, { lat, lng });
        } catch (error) {
          console.log("😱 Error: ", error);
        }
      };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="  Location"
        className="event"
      />
      <ComboboxPopover className="locations">
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description}/>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}