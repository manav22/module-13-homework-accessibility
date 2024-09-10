import { CardContainer } from '@/components/CardContainer';
import { FoodCard } from '@/components/FoodCard';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ThemedText style={styles.title} type="title">
        Menu
      </ThemedText>
      <CardContainer>
        <FoodCard
          price="$10"
          image={require('../assets/pizza.jpg')}
          link="order/pizza"
          label="Pizza"
        />
        <FoodCard
          price="$5"
          image={require('../assets/hamburger.webp')}
          link="order/hamburger"
          label="Hamburger"
        />
        <FoodCard
          unavailable
          price="$3"
          image={require('../assets/espresso.jpg')}
          link="order/coffee"
          label="Coffee"
        />
      </CardContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginVertical: 16,
  },
});
