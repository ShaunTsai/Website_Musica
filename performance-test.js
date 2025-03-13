// Performance Test Script
console.log('Running performance tests...');

// Performance Metrics Collection
const performanceMetrics = {
    // Load Times
    navigationStart: 0,
    loadComplete: 0,
    domReady: 0,
    
    // Resource Counts
    imageCount: 0,
    scriptCount: 0,
    styleCount: 0,
    
    // Size Metrics
    totalResourceSize: 0,
    
    // Performance Marks
    marks: new Map()
};

// Mark timing points
function mark(name) {
    const time = performance.now();
    performanceMetrics.marks.set(name, time);
    console.log(`${name}: ${time.toFixed(2)}ms`);
}

// Measure time between marks
function measure(startMark, endMark) {
    const start = performanceMetrics.marks.get(startMark);
    const end = performanceMetrics.marks.get(endMark);
    if (start && end) {
        const duration = end - start;
        console.log(`${startMark} to ${endMark}: ${duration.toFixed(2)}ms`);
        return duration;
    }
    return 0;
}

// Resource Loading Analysis
function analyzeResources() {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    const resourceTypes = {
        img: 0,
        css: 0,
        script: 0,
        other: 0
    };

    resources.forEach(resource => {
        totalSize += resource.encodedBodySize || 0;
        
        if (resource.name.match(/\.(jpg|png|gif|webp)$/i)) resourceTypes.img++;
        else if (resource.name.match(/\.css$/i)) resourceTypes.css++;
        else if (resource.name.match(/\.js$/i)) resourceTypes.script++;
        else resourceTypes.other++;
        
        console.log(`Resource: ${resource.name}`);
        console.log(`- Duration: ${resource.duration.toFixed(2)}ms`);
        console.log(`- Size: ${(resource.encodedBodySize / 1024).toFixed(2)}KB`);
    });

    console.log('\nResource Summary:');
    console.log(`Total Size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log('Resource Count:', resourceTypes);
}

// DOM Performance Tests
function testDOMPerformance() {
    mark('domTest-start');
    
    // Test DOM query performance
    const selectors = [
        '.nav-links a',
        '.hero h1',
        '.feature-item',
        'img'
    ];
    
    selectors.forEach(selector => {
        const start = performance.now();
        document.querySelectorAll(selector);
        const end = performance.now();
        console.log(`DOM Query '${selector}': ${(end - start).toFixed(2)}ms`);
    });
    
    mark('domTest-end');
}

// Animation Performance Test
function testAnimationPerformance() {
    mark('animation-start');
    
    // Test smooth scroll performance
    const scrollTest = () => {
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        });
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500);
    };
    
    scrollTest();
    mark('animation-end');
}

// Run all performance tests
window.addEventListener('load', () => {
    mark('pageLoad');
    console.log('\n=== Performance Test Results ===\n');
    
    // Navigation Timing
    const timing = performance.timing;
    const navigationStart = timing.navigationStart;
    const loadTime = timing.loadEventEnd - navigationStart;
    const domReadyTime = timing.domContentLoadedEventEnd - navigationStart;
    
    console.log('Page Load Metrics:');
    console.log(`- Total Load Time: ${loadTime}ms`);
    console.log(`- DOM Ready Time: ${domReadyTime}ms`);
    
    // Run Tests
    testDOMPerformance();
    testAnimationPerformance();
    analyzeResources();
    
    // Final Performance Score
    const calculatePerformanceScore = () => {
        const metrics = {
            loadTime: loadTime < 2000 ? 100 : (2000 / loadTime) * 100,
            domReady: domReadyTime < 1000 ? 100 : (1000 / domReadyTime) * 100
        };
        
        const score = Object.values(metrics).reduce((a, b) => a + b) / Object.keys(metrics).length;
        console.log(`\nOverall Performance Score: ${score.toFixed(2)}/100`);
    };
    
    calculatePerformanceScore();
});
