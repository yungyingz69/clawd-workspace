#!/usr/bin/env python3
"""Generate rainbow art batch 2 - Mixed styles (no curves)"""

import json
import sys
import os
import time
import urllib.request

sys.path.insert(0, '/Users/Yingz/clawd/skills/krea-api')
from krea_api import KreaAPI

def download_image(url: str, filepath: str) -> bool:
    """Download image from URL to local file."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        return True
    except Exception as e:
        print(f"  ❌ Download failed: {e}")
        return False

def main():
    # Load prompts
    with open('/Users/Yingz/clawd/etsy-rainbow/prompts-batch2.json', 'r') as f:
        data = json.load(f)
    
    # Output directory
    output_dir = '/Users/Yingz/clawd/etsy-rainbow/batch2'
    os.makedirs(output_dir, exist_ok=True)
    
    # Initialize API
    api = KreaAPI()
    
    results = []
    total = sum(len(s['prompts']) for s in data['sets'])
    current = 0
    
    for set_info in data['sets']:
        set_id = set_info['set_id']
        theme = set_info['theme']
        style = set_info['style']
        
        print(f"\n{'='*60}")
        print(f"Set {set_id}: {theme} ({style})")
        print('='*60)
        
        for var_idx, prompt in enumerate(set_info['prompts'], 1):
            current += 1
            print(f"\n[{current}/{total}] Generating {theme} v{var_idx}...")
            print(f"  Prompt: {prompt[:80]}...")
            
            try:
                # Generate with Imagen 4
                job = api.generate_image(
                    prompt=prompt,
                    model="imagen-4",
                    width=1024,
                    height=1024
                )
                job_id = job['job_id']
                print(f"  Job: {job_id}")
                
                # Wait for completion
                result = api.wait_for_completion(job_id, poll_interval=3.0, timeout=180)
                urls = result.get('result', {}).get('urls', [])
                
                if urls:
                    url = urls[0]
                    # Save locally
                    filename = f"set{set_id:02d}_{theme.lower().replace(' ', '-')}_v{var_idx}.png"
                    filepath = os.path.join(output_dir, filename)
                    
                    if download_image(url, filepath):
                        print(f"  ✅ Saved: {filename}")
                        results.append({
                            'set_id': set_id,
                            'theme': theme,
                            'style': style,
                            'variation': var_idx,
                            'prompt': prompt,
                            'url': url,
                            'local_file': filepath
                        })
                    else:
                        results.append({
                            'set_id': set_id,
                            'theme': theme,
                            'variation': var_idx,
                            'url': url,
                            'error': 'download_failed'
                        })
                else:
                    print(f"  ⚠️ No URLs in result")
                    results.append({
                        'set_id': set_id,
                        'theme': theme,
                        'variation': var_idx,
                        'error': 'no_urls'
                    })
                    
            except Exception as e:
                print(f"  ❌ Error: {e}")
                results.append({
                    'set_id': set_id,
                    'theme': theme,
                    'variation': var_idx,
                    'error': str(e)
                })
            
            # Small delay between requests
            time.sleep(1)
    
    # Save results
    results_file = os.path.join(output_dir, 'results.json')
    with open(results_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    # Summary
    success = len([r for r in results if 'local_file' in r])
    print(f"\n{'='*60}")
    print(f"COMPLETE: {success}/{total} images generated")
    print(f"Results saved to: {results_file}")
    print(f"Images saved to: {output_dir}")
    print('='*60)

if __name__ == "__main__":
    main()
