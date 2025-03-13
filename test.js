// Feature Test Script
console.log('Running feature tests...');

// Test 1: CSS Grid Support
function testGridSupport() {
    return CSS.supports('display', 'grid');
}

// Test 2: Flexbox Support
function testFlexboxSupport() {
    return CSS.supports('display', 'flex');
}

// Test 3: CSS Variables Support
function testCSSVariablesSupport() {
    return window.CSS && CSS.supports('color', 'var(--test)');
}

// Test 4: Smooth Scroll Support
function testSmoothScrollSupport() {
    return 'scrollBehavior' in document.documentElement.style;
}

// Test 5: Background Image Support
function testBackgroundImageSupport() {
    const div = document.createElement('div');
    div.style.backgroundImage = "url('test.jpg')";
    return div.style.backgroundImage.indexOf('url') !== -1;
}

// Test 6: Transform Support
function testTransformSupport() {
    return CSS.supports('transform', 'translateY(-2px)');
}

// Test 7: Transition Support
function testTransitionSupport() {
    return CSS.supports('transition', 'all 0.3s');
}

// Run all tests
function runAllTests() {
    const tests = {
        'CSS Grid': testGridSupport(),
        'Flexbox': testFlexboxSupport(),
        'CSS Variables': testCSSVariablesSupport(),
        'Smooth Scroll': testSmoothScrollSupport(),
        'Background Image': testBackgroundImageSupport(),
        'Transform': testTransformSupport(),
        'Transition': testTransitionSupport()
    };

    console.log('Test Results:');
    Object.entries(tests).forEach(([feature, supported]) => {
        console.log(`${feature}: ${supported ? '✅' : '❌'}`);
    });
}

// Check viewport responsiveness
function checkViewportResponsiveness() {
    const breakpoints = {
        mobile: 480,
        tablet: 768,
        desktop: 1024
    };

    function checkBreakpoint() {
        const width = window.innerWidth;
        console.log(`Current viewport width: ${width}px`);
        Object.entries(breakpoints).forEach(([device, size]) => {
            console.log(`${device.charAt(0).toUpperCase() + device.slice(1)} layout (${size}px): ${width <= size ? '✅' : '➖'}`);
        });
    }

    window.addEventListener('resize', checkBreakpoint);
    checkBreakpoint();
}

// Check navigation functionality
function testNavigation() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        console.log(`Navigation link "${link.textContent}": ${target ? '✅' : '❌'}`);
    });
}

// Check image loading
function testImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        console.log(`Image ${img.src}: ${img.complete ? '✅' : '❌'}`);
    });
}

// Run all tests when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Starting feature tests...');
    runAllTests();
    checkViewportResponsiveness();
    testNavigation();
    testImageLoading();
});
