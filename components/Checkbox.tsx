import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { CardContainer } from './CardContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from './ThemedText';

type CheckboxProps = {
  items: string[];
  onChange: (checkedItems: string[]) => void;
};

export function ChecboxGroup({ items, onChange }: CheckboxProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const onPressCheckbox = useCallback((label: string) => {
    setCheckedItems((previous) => {
      let checkedItems = [...previous];
      if (previous.includes(label)) {
        checkedItems = previous.filter((item) => item !== label);
      } else {
        checkedItems = [...previous, label];
      }

      onChange(checkedItems);
      return checkedItems;
    });
  }, []);

  return (
    <CardContainer>
      {items.map((item) => (
        <Checkbox
          onPress={onPressCheckbox}
          key={item}
          label={item}
          checked={checkedItems.includes(item)}
        />
      ))}
    </CardContainer>
  );
}

function Checkbox(props: {
  checked: boolean;
  onPress: (label: string) => void;
  label: string;
}) {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      style={styles.checkbox}
      onPress={() => {
        props.onPress(props.label);
      }}
    >
      <View
        style={[
          styles.box,
          {
            borderColor: theme === 'light' ? '#00000020' : '#ffffff20',
          },
        ]}
      >
        {props.checked ? (
          <Ionicons
            name="checkmark-sharp"
            color={theme === 'light' ? 'black' : 'white'}
            size={20}
          />
        ) : null}
      </View>
      <ThemedText>{props.label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
