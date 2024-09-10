import React, { useCallback } from 'react';
import { CardContainer } from './CardContainer';
import { ThemedText } from './ThemedText';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type RadioGroupProps = {
  options: string[];
  onSelect: (option: string) => void;
};

export function RadioGroup({ options, onSelect }: RadioGroupProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  const onPressRadio = useCallback(
    (label: string) => {
      onSelect(label);
      setSelected(label);
    },
    [onSelect],
  );

  return (
    <CardContainer>
      {options.map((option) => (
        <Radio
          key={option}
          label={option}
          selected={selected === option}
          onPress={onPressRadio}
        />
      ))}
    </CardContainer>
  );
}

function Radio(props: {
  label: string;
  selected: boolean;
  onPress: (name: string) => void;
}) {
  return (
    <TouchableOpacity
      accessibilityState={{
        selected: props.selected,
      }}
      accessibilityRole="radio"
      hitSlop={{
        top: 10,
        bottom: 10,
      }}
      onPress={() => {
        props.onPress(props.label);
      }}
      style={styles.radio}
    >
      <ThemedText>{props.label}</ThemedText>
      {props.selected ? (
        <Ionicons name="checkmark-sharp" color="#0a7ea4" size={24} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
