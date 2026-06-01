import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,

    shadowColor: '#7C4DFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 12,
  },

  highlightText: {
    color: '#7C4DFF',
  },

  subtitle: {
    fontSize: 16,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 80,
  },

  button: {
    width: '100%',
    height: 58,
    backgroundColor: '#7C4DFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#7C4DFF',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

});