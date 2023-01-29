react apis:
### componentDidMount
- React will call it when your component is first added (mounted) to the screen. This is a common place to start data fetching, set up subscriptions, or manipulate the DOM nodes.

### componentDidUpdate(prevProps, prevState, snapshot?)
- React will call it immediately after your component has been re-rendered with updated props or state.  This method is not called for the initial render.
- componentDidUpdate will not get called if shouldComponentUpdate is defined and returns false.
- getSnapshotBeforeUpdate(prevProps, prevState)

### componentWillUnmount()
- React will call it before your component is removed (unmounted) from the screen. This is a common place to cancel data fetching or remove subscriptions.
- The logic inside componentWillUnmount should “mirror” the logic inside componentDidMount.

### componentDidCatch(error, info)

### forceUpdate(callback?)



### componentWillMount()
- Deprecated

### componentWillReceiveProps(nextProps) 
- Deprecated

### componentWillUpdate(nextProps, nextState)
- Deprecated
  

