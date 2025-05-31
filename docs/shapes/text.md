<script setup>
import Block from '../components/Block.vue'
</script>

# Text
Text represents text element.

## Rendering text
<Block name="textBasics" />

## Text anchors
You can position text on 3 anchors in each axis: `top`, `center`, `bottom`. Example below iterates through them:
<Block name="textAnchors" />

## Text width constraint
The text can automatically break if you provide `width` paramter.

> [!WARNING] width and anchor
> Currently width does not work with non-default values of anchor. The only way to break the text is to keep it aligned to the left for now. In the future options to align it to the left / right / center / justify should be available.

<Block name="textBox" />