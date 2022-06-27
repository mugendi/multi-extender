// Copyright 2022 Anthony Mugendi
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module.exports =
	(...mixins) =>
	(Base) => {
		const copyProps = (target, source, { prefix, suffix }) => {
			// console.log(Object.getOwnPropertyNames(source))
			// console.log(Object.getOwnPropertySymbols(source))

			Object.getOwnPropertyNames(source)
				.concat(Object.getOwnPropertySymbols(source))
				.forEach((prop) => {
					if (
						prop.match(
							/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
						)
					) {
						return;
					}

					let propName=prop;

					if (prefix) propName = `${prefix}${prop}`;
					if (suffix) propName = `${prop}${suffix}`;

					Object.defineProperty(
						target,
						propName,
						Object.getOwnPropertyDescriptor(source, prop)
					);
				});
		};

		mixins.forEach((mixin) => {
			// Get source prefix && suffix
			let sourceStr = mixin.toString();
			let m = sourceStr.match(/#__prefix\s*=\s*["'`]([^"'`]+)/);
			let prefix = m && m.length && m[1];
			m = sourceStr.match(/#__suffix\s*=\s*["'`]([^"'`]+)/);
			let suffix = m && m.length && m[1];

			copyProps(Base, mixin, { prefix, suffix });
			copyProps(Base.prototype, mixin.prototype, { prefix, suffix });
		});

		return Base;
	};
