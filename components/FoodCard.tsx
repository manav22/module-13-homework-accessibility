import React from 'react';
import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

type FormCardProps = {
  label: string;
  image: ImageSourcePropType;
  link: string;
  price: string;
  unavailable?: boolean;
};

export function FoodCard(props: FormCardProps) {
  const theme = useColorScheme();

  return (
    <Link
      disabled={props.unavailable}
      href={props.link}
      style={[
        styles.container,
        {
          opacity: props.unavailable ? 0.4 : 1,
        },
      ]}
      asChild
      accessibilityRole="button"
    >
      <Pressable>
        <Image source={props.image} style={styles.thumbnail} />
        <View style={styles.labelAndPrics}>
          <ThemedText
            style={{
              textDecorationLine: props.unavailable ? 'line-through' : 'none',
            }}
          >
            {props.label}
          </ThemedText>
          <ThemedText type="detail">{props.price}</ThemedText>
        </View>
        <Ionicons
          color={theme === 'light' ? 'black' : 'white'}
          name="chevron-forward-sharp"
          size={24}
        />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelAndPrics: { flex: 1, paddingStart: 8 },
  thumbnail: { width: 90, height: 60, borderRadius: 12, overflow: 'hidden' },
});
