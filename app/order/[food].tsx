import React, { useCallback, useRef, useState } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import {
  Alert,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { RadioGroup } from '@/components/Radio';
import { ChecboxGroup } from '@/components/Checkbox';

type Option = {
  variants: string[];
  title: string;
  options: string[];
};

const data: Record<string, Option> = {
  pizza: {
    title: 'Pizza',
    variants: ['Small', 'Medium', 'Large'],
    options: ['No cheese', 'Extra sauce', 'Extra pepperoni'],
  },
  hamburger: {
    title: 'Hamburger',
    variants: ['Single', 'Double', 'Triple'],
    options: ['No pickles', 'Extra cheese', 'Extra bacon'],
  },
  coffee: {
    title: 'Coffee',
    variants: ['Small', 'Medium', 'Large'],
    options: ['No sugar', 'Extra cream', 'Extra shot'],
  },
};

export default function Order() {
  const { food } = useLocalSearchParams<{ food: string }>();
  if (!food || !data[food]) {
    // error here
    return null;
  }

  const options = data[food];

  const [checkoutEnabled, setCheckoutEnabled] = useState(false);
  const selectedVariant = useRef<string | null>(null);
  const selectedOptions = useRef<string[]>([]);

  const handleSelectVariant = useCallback((variant: string) => {
    selectedVariant.current = variant;
    setCheckoutEnabled(true);
  }, []);

  const handleSelectOptions = useCallback((options: string[]) => {
    selectedOptions.current = options;
  }, []);

  const confirmOrder = useCallback(
    () =>
      Alert.alert(
        'Order confirmation',
        `You are ordering a ${selectedVariant.current} ${options.title}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            style: 'default',
            isPreferred: true,
            onPress: router.back,
          },
        ],
      ),
    [],
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={
        Platform.OS === 'ios'
          ? // iOS has a fullscreen native modal, so we only need bottom insets, top is already covered.
            ['bottom']
          : // Android doesn't have a fullscreen native modal, so we need all insets.
            undefined
      }
    >
      <Link href="../" asChild>
        <Pressable>
          <ThemedText style={styles.goBack} type="link">
            Back
          </ThemedText>
        </Pressable>
      </Link>
      <ThemedText style={styles.title} type="title">
        {options.title}
      </ThemedText>
      <ThemedText style={styles.title} type="subtitle">
        Pick a size
      </ThemedText>
      <RadioGroup options={options.variants} onSelect={handleSelectVariant} />
      <ThemedText style={styles.title} type="subtitle">
        Check the options
      </ThemedText>
      <ChecboxGroup items={options.options} onChange={handleSelectOptions} />
      <View
        style={[styles.buttonContainer, { opacity: checkoutEnabled ? 1 : 0.8 }]}
      >
        <Button
          accessibilityLabel={
            checkoutEnabled ? 'Checkout' : 'Select a size first to checkout'
          }
          title="Checkout"
          disabled={!checkoutEnabled}
          onPress={confirmOrder}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  goBack: {
    fontSize: 18,
    marginLeft: 16,
    marginTop: 16,
  },
  title: {
    margin: 16,
  },
  buttonContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
