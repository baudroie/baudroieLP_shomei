# Source integration and evidence provenance

Final capture starts from merge 265654e, parents local161d447 and remote5613f33. Remote source/editor changes were incorporated without force push. Remote round23 metadata is preserved under artifacts/qa/other-worker-round23/, and its review under docs/other-worker-independent-review-round-23.md. Those files describe another worker and do not claim to match local round23 screenshots (f90cc03).

Local rounds: 23=f90cc03 baseline, 24=de6e536 initial photo/layout fix, 25=58aad43 refinements, 26=f0bd0bd deeper HR image (published fac562b then reviewed), 27=20f342b HR downstream alignment correction. Round27 build may identify161d447 because a documentation-only commit completed while the build was running; src/public are equal to20f342b. It is an intermediate release and was not published. Final28 fixes version correspondence by keeping HEAD265654e unchanged throughout capture, build and static verification.

Round26 subjects/ contains diagnostic captures affected by fixed skip-link placement during element scrolling. subjects-stable/ and round28 subjects-stable/ use full-page images captured at scroll0 after blur/reset, then native-scale global-coordinate crops. No original image file was edited or upscaled.
