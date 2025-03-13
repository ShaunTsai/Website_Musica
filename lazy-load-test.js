// Lazy Loading Test Script
console.log('Running lazy loading tests...');

// Test utilities
const TestResults = {
    passed: 0,
    failed: 0,
    log: function(test, result, details = '') {
        const status = result ? '✅ PASSED' : '❌ FAILED';
        console.log(`${status}: ${test} ${details}`);
        result ? this.passed++ : this.failed++;
    },
    summary: function() {
        console.log(`\nTest Summary:\nPassed: ${this.passed}\nFailed: ${this.failed}`);
    }
};

// Test 1: Check if native lazy loading is supported
function testNativeLazyLoading() {
    const supported = 'loading' in HTMLImageElement.prototype;
    TestResults.log(
        'Native Lazy Loading Support',
        supported,
        supported ? '(Browser supports native lazy loading)' : '(Using fallback)'
    );
}

// Test 2: Verify high-priority images
function testHighPriorityImages() {
    const highPriorityImages = document.querySelectorAll('img[fetchpriority="high"]');
    const result = Array.from(highPriorityImages).every(img => {
        const rect = img.getBoundingClientRect();
        return rect.top < window.innerHeight; // Should be above the fold
    });
    TestResults.log(
        'High Priority Images',
        result,
        `(Found ${highPriorityImages.length} high priority images)`
    );
}

// Test 3: Check lazy-loaded images
function testLazyLoadedImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const result = Array.from(lazyImages).every(img => {
        const rect = img.getBoundingClientRect();
        return img.loading === 'lazy' && img.decoding === 'async';
    });
    TestResults.log(
        'Lazy Loaded Images Configuration',
        result,
        `(Found ${lazyImages.length} lazy-loaded images)`
    );
}

// Test 4: Verify iframe lazy loading
function testIframeLazyLoading() {
    const iframes = document.querySelectorAll('iframe[loading="lazy"]');
    const result = Array.from(iframes).every(iframe => {
        return iframe.hasAttribute('data-src') && !iframe.hasAttribute('src');
    });
    TestResults.log(
        'Iframe Lazy Loading',
        result,
        `(Found ${iframes.length} lazy-loaded iframes)`
    );
}

// Test 5: Check resource hints
function testResourceHints() {
    const preconnects = document.querySelectorAll('link[rel="preconnect"]');
    const dnsPrefetch = document.querySelectorAll('link[rel="dns-prefetch"]');
    const preloads = document.querySelectorAll('link[rel="preload"]');
    
    TestResults.log(
        'Resource Hints',
        preconnects.length > 0 && dnsPrefetch.length > 0 && preloads.length > 0,
        `(Preconnect: ${preconnects.length}, DNS Prefetch: ${dnsPrefetch.length}, Preload: ${preloads.length})`
    );
}

// Test 6: Intersection Observer implementation
function testIntersectionObserver() {
    const result = typeof lazyLoadObserver !== 'undefined' && 
                  lazyLoadObserver instanceof IntersectionObserver;
    TestResults.log(
        'Intersection Observer Implementation',
        result
    );
}

// Test 7: Performance measurement
async function testLoadingPerformance() {
    const start = performance.now();
    const images = document.querySelectorAll('img');
    
    await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    }));
    
    const duration = performance.now() - start;
    TestResults.log(
        'Image Loading Performance',
        duration < 3000, // Less than 3 seconds
        `(Loading time: ${duration.toFixed(2)}ms)`
    );
}

// Run all tests
async function runAllTests() {
    console.log('Starting lazy loading tests...\n');
    
    testNativeLazyLoading();
    testHighPriorityImages();
    testLazyLoadedImages();
    testIframeLazyLoading();
    testResourceHints();
    testIntersectionObserver();
    await testLoadingPerformance();
    
    TestResults.summary();
}

// Run tests when DOM is loaded
document.addEventListener('DOMContentLoaded', runAllTests);
