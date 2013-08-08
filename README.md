# jquery.divide

A jquery plugin that splits HTML lists (or other elements) into a specified number of columns, maintaining the vertical sort order.

## Options

```javascript
threshold: 1			//	only act if number of children is greater than this number
cols: 2					//	number of columns to create out of initial items
classPrefix: 'column-'	//	prefix used to identify offspring elements
wrapper: 'div'			//	type of element that should be used to wrap divided children
target: null			//	expression for selecting child (if something other than all children is required)
```
