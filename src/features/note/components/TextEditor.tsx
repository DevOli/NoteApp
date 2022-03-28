import React, {useCallback} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

const TextEditor = () => {
  const onPressAddImage = useCallback(() => {
    // insert URL
    richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
      'background: gray;',
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }, []);
  const richText = React.useRef<any>();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scroll}>
        <Text>Description:</Text>
        <RichEditor
          //useContainer={false}
          style={styles.textView}
          ref={richText}
          onChange={descriptionText => {
            console.log('descriptionText:', descriptionText);
          }}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          editor={richText}
          onPressAddImage={onPressAddImage}
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
          ]}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  textView: {
    flex: 1,
  },
});

export default TextEditor;
