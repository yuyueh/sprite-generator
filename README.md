# sprite-generator

You only need to specify the path where the images exists(png only), images-sprite-generator can help you to generate a stylesheet with sprite.

# Usage

### NPX

```command
npx images-sprite-generator gen-sprite args...
```

### Example(base64)

```command
npx images-sprite-generator gen-sprite --src=./icons/ --cssOutput=./output.css
```

```css
.sprite__{image name}
{
    width: 10px;
    height: 10px;
    background-position: -10px -10px;
}

...

.sprite {
    background-image: url(base64);
}
```

### Example(create new png)

```command
npx images-sprite-generator gen-sprite --src=./icons/ --cssOutput=./output.css --spriteOutput=./sprite.png
```

```css
.sprite__{image name}
{
    width: 10px;
    height: 10px;
    background-position: -10px -10px;
}

...

.sprite {
    background-image: url(./sprite.png);
}
```

### Example(HTML)

and then you can easily use sprite icon in your html.

```html
<div class="sprite sprite__image-name"></div>
```

# Options

| args           | description                              | type   | default      |
| -------------- | ---------------------------------------- | ------ | ------------ |
| `src`          | path of images.(required)                | string | -            |
| `padding`      | padding of each images                   | number | 10           |
| `spaces`       | the number of spaces for stylesheet      | number | 4            |
| `prefix`       | prefix of class name for stylesheet      | string | `sprite`     |
| `cssOutput`    | output path of stylesheet                | string | `output.css` |
| `spriteOutput` | sprite png path, base64 mode if is empty | string | -            |

# TBD

-   [ ] [Exploring rectangle packing algorithms](https://www.david-colson.com/2020/03/10/exploring-rect-packing.html)
-   [ ] Github action
-   [ ] Unit test
-   [ ] Provide options for image type(png and jpg)
-   [ ] Fix the error message that appears when executed by non-administrators
