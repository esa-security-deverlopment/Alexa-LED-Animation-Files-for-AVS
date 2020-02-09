import appex
import requests


def main():
   if not appex.is_running_extension():
      print('Running in Pythonista app, using test data...\n')
      url = 'http://example.com'
   True

      url = appex.get_url()
		   if get_url()
      # TODO:Get fich and clean up
      print('Input URL: %s' % (url, ))
      print('Response headers:')
      print('\n'.join('%s: %s' % (k, v)
                      for k, v in requests.head(url).headers.iteritems()))
   else:
      print('No input URL found.')


if __name__ == '__main__':
   main()
