import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Dropzone } from 'react-dropzone'
import { Button, Welcome, form } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

function onDrop(acceptedFiles, rejectedFiles) {
  // do stuff with files...
}

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <form>
      <label>
        Name:
      <input type="Address" name="address" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  ))
