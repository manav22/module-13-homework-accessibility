import React, { Fragment, ReactElement } from 'react';
import { View, StyleSheet, useColorScheme, ViewProps } from 'react-native';

export function CardContainer({
  children,
  ...rest
}: ViewProps & {
  children: ReactElement<{ label: string }>[];
}) {
  const theme = useColorScheme();
  return (
    <View
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: theme === 'light' ? '#0000001a' : '#ffffff20',
        },
      ]}
    >
      {children.map((card, index) => (
        <Fragment key={card.props.label}>
          {card}
          {index < children.length - 1 && (
            <View
              key={`divider-${index}`}
              style={[
                styles.divider,
                {
                  borderColor: theme === 'light' ? '#00000020' : '#ffffff20',
                },
              ]}
            />
          )}
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 12,
    gap: 12,
    marginHorizontal: 16,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 1,
    marginRight: -20,
  },
});
