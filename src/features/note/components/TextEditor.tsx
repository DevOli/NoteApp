import React, {useCallback} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

type Props = {
  content?: string;
  handleChange: (html: string) => void;
  clear?: boolean;
};

const TextEditor = ({content, handleChange}: Props) => {
  const onPressAddImage = useCallback(() => {
    richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
      'background: gray;',
    );
  }, []);
  const richText = React.useRef<any>();

  richText.current?.setContentHTML(content);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scroll}>
        <RichEditor
          //useContainer={false}
          style={styles.textView}
          ref={richText}
          onChange={handleChange}
          initialContentHTML={content}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          editor={richText}
          onPressAddImage={onPressAddImage}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertOrderedList,
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
            actions.heading4,
            actions.code,
          ]}
          iconMap={{
            [actions.heading1]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
            ),
            [actions.heading4]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
            ),
          }}
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
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});

export default TextEditor;
