---
    name: motion.create() for third-party component wrapping
    description: Wrap non-HTML components (e.g. wouter Link) with framer-motion without deprecation warnings.
    ---

    ## Rule
    Use motion.create(Component) instead of motion(Component) when wrapping third-party components with framer-motion.

    **Why:** motion() is deprecated in framer-motion v12+. Emits: "motion() is deprecated. Use motion.create() instead."

    **How to apply:**
    const MotionLink = motion.create(Link); // correct
    // const MotionLink = motion(Link);     // deprecated

    This also solves the nested-interactive-element accessibility issue (Link > button) since the wrapped Link renders as a single anchor with motion props applied directly.
    