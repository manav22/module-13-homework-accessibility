# Hints

Please check the [readme](./README.md) first if you haven't to see the homework instructions.

Here are some hints to help you get started:

## 1. Accessibility States

You will notice that when you check a checkbox or select a radio button, there is absolutely no feedback that you selected them.
Even worse, when you focus on the checkbox or radio button, there is no feedback that you have checked/select them.

To fix this, we can use the `accessibilityState` prop to provide feedback to the user when they check/select a checkbox/radio button.

An example for a checkbox:

```tsx
function Checkbox(/* props */) {
  // ...
  return (
    <TouchableOpacity
    accessibilityState={{ checked: props.checked }}
    // ...
    >
      // ...
    </TouchableOpacity>
  );
}
```

## 2. Accessibility Roles

The roles for checkbox and radio buttons are not set, you can set them using the `accessibilityRole` prop.

```tsx
function Checkbox(/* props */) {
  // ...
  return (
    <TouchableOpacity
    // ...
    accessibilityRole="checkbox"
    // ...
    >
      // ...
    </TouchableOpacity>
  );
}
```

## 3. There are two buttons that you can use to go back on modal

If you toggle the order modal and go to the next elements, you will notice that on iOS, there are two buttons that you can use to go back on the modal.
And they are right next to each other, which can be confusing for the user.
So we can use the `accessibilityElementsHidden` prop to hide the back button that is not needed.

```tsx
<Link
  // ...
  accessibilityElementsHidden={Platform.OS === 'ios'}
>
    // ...
    Back
    // ...
</Link>
```

## 4. Turn the link roles into buttons

You will notice that some elements such as the `Back` button and food cards on the home screen has the `link` role. This is a default role that is coming from the `expo-router` library.
We can change the role to `button`:

```tsx
<Link
  // ...
  accessibilityRole="button"
>
    // ...
    Back
    // ...
</Link>
```

## 5. Bonus: Use `hitSlop` to make the touchable areas bigger

You can use the `hitSlop` prop to make the touchable areas bigger for the buttons. By default, the checkbox and radio button are small and can be hard to tap on.
[Apple recommends the touch targets to be at least 44x44 points](https://developer.apple.com/design/human-interface-guidelines/accessibility#Buttons-and-controls). So we can use the `hitSlop` prop to make the touchable area bigger.

```tsx
function Checkbox(/* props */) {
  // ...
  return (
    <TouchableOpacity
    // ...
    // Layout Inspector shows the height is 24
    // 24 + 10 + 10 = 44
    hitSlop={{ top: 10, bottom: 10 }}
    >
      // ...
    </TouchableOpacity>
  );
}
```
